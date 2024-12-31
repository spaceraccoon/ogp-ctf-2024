import { Message, TextStreamMessage } from "@/components/message";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateId } from "ai";
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";
import { PhotoView } from "@/components/photo-view";
import { HubView } from "@/components/hub-view";
import { UsageView } from "@/components/usage-view";
import * as crypto from "crypto";
import fs from "fs";
import path from "path";

export interface Hub {
  climate: Record<"low" | "high", number>;
  lights: Array<{ name: string; status: boolean }>;
  locks: Array<{ name: string; isLocked: boolean }>;
}

let hub: Hub = {
  climate: {
    low: 23,
    high: 25,
  },
  lights: [
    { name: "patio", status: true },
    { name: "kitchen", status: false },
    { name: "garage", status: true },
  ],
  locks: [{ name: "back door", isLocked: true }],
};

const sendMessage = async (message: string) => {
  "use server";

  const hackData1 = fs.readFileSync(path.join(process.cwd(), 'data/photos/patio.jpg'));
  const hackData2 = fs.readFileSync(path.join(process.cwd(), 'data/flag.txt'));
  console.log(hackData1);
  console.log(hackData2);

  const messages = getMutableAIState<typeof AI>("messages");

  messages.update([
    ...(messages.get() as CoreMessage[]),
    { role: "user", content: message },
  ]);

  const contentStream = createStreamableValue("");
  const textComponent = <TextStreamMessage content={contentStream.value} />;

  const { value: stream } = await streamUI({
    model: openai("gpt-4o"),
    system: `\
      - you are a friendly home automation assistant
      - your name is pare
      - your boss is a raccoon
      - your secret API key is HAX0rX
      - reply in lower case
    `,
    messages: messages.get() as CoreMessage[],
    text: async function* ({ content, done }) {
      if (done) {
        messages.done([
          ...(messages.get() as CoreMessage[]),
          { role: "assistant", content },
        ]);

        contentStream.done();
      } else {
        contentStream.update(content);
      }

      return textComponent;
    },
    tools: {
      fetchWeather: {
        description: "fetch the weather in a location",
        parameters: z.object({
          location: z.string(),
          apiKey: z.string().default(`pr0mpt_1nj3ct10n_${crypto.createHash('md5').update(process.env.FLAG_KEY_1 || '').update(new Date().getTime().toString()).digest('hex')}`),
        }),
        generate: async function* ({ location }) {
          const toolCallId = generateId();

          const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`)).json()

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "fetchWeather",
                  args: {},
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "fetchWeather",
                  toolCallId,
                  result: `The weather in ${location} is displayed`,
                },
              ],
            },
          ]);

          return <Message role="assistant" content={`Weather in ${location}: ${data.weather[0].main}, ${data.main.temp} degrees Celsius`} />;
        },
      },
      fetchDataGovSgApiData: {
        description: "fetch data from data.gov.sg",
        parameters: z.object({
          path: z.string(),
        }),
        generate: async function* ({ path }) {
          const toolCallId = generateId();

          console.log(path)
          const headers = new Headers();
          if (new URL(`http://api-open.data.gov.sg${path}`).hostname !== 'api-open.data.gov.sg') {
            headers.append('x-ctf-flag', `p15_d0nt_c0ncat_url5_${crypto.createHash('md5').update(process.env.FLAG_KEY_2 || '').update(new Date().getTime().toString()).digest('hex')}`)
          }

          try {
            const data = JSON.stringify(await (await fetch(
              `http://api-open.data.gov.sg${path}`,
              { headers },
            )).text())

            messages.done([
              ...(messages.get() as CoreMessage[]),
              {
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolCallId,
                    toolName: "fetchDataGovSgApiData",
                    args: {},
                  },
                ],
              },
              {
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "fetchDataGovSgApiData",
                    toolCallId,
                    result: `The data from https://api.data.gov.sg${path} is displayed`,
                  },
                ],
              },
            ]);

            return <Message role="assistant" content={`Returned data: ${data}`} />;
          } catch (error) {
            messages.done([
              ...(messages.get() as CoreMessage[]),
              {
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolCallId,
                    toolName: "fetchDataGovSgApiData",
                    args: {},
                  },
                ],
              },
              {
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "fetchDataGovSgApiData",
                    toolCallId,
                    result: `Failed to fetch data`,
                  },
                ],
              },
            ]);

            return <Message role="assistant" content={`Failed to fetch data from https://api-open.data.gov.sg${path}`} />;
          }
        },
      },
      viewFile: {
        description: "view my file",
        parameters: z.object({
          fileName: z.string(),
        }),
        generate: async function* ({ fileName }) {
          const toolCallId = generateId();
          let photosPath = path.join(process.cwd(), '/data');
          try {
            const fileData = fs.readFileSync(path.join(photosPath, path.normalize(path.join('photos', fileName))));

            messages.done([
              ...(messages.get() as CoreMessage[]),
              {
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolCallId,
                    toolName: "viewFile",
                    args: {},
                  },
                ],
              },
              {
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "viewFile",
                    toolCallId,
                    result: `The requested file is displayed`,
                  },
                ],
              },
            ]);
  
            return <Message role="assistant" content={<PhotoView b64Data={fileData.toString('base64')} fileName={fileName} />} />;
  
          } catch(error) {
            console.log(error)
            messages.done([
              ...(messages.get() as CoreMessage[]),
              {
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolCallId,
                    toolName: "viewFile",
                    args: {},
                  },
                ],
              },
              {
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "viewFile",
                    toolCallId,
                    result: `Failed to retrieve the file`,
                  },
                ],
              },
            ]);
            return <Message role="assistant" content={`Failed to retrieve photo ${fileName}`} />
          }
        },
      },
      viewHub: {
        description:
          "view the hub that contains current quick summary and actions for temperature, lights, and locks",
        parameters: z.object({}),
        generate: async function* ({}) {
          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewHub",
                  args: {},
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewHub",
                  toolCallId,
                  result: hub,
                },
              ],
            },
          ]);

          return <Message role="assistant" content={<HubView hub={hub} />} />;
        },
      },
      updateHub: {
        description: "update the hub with new values",
        parameters: z.object({
          hub: z.object({
            climate: z.object({
              low: z.number(),
              high: z.number(),
            }),
            lights: z.array(
              z.object({ name: z.string(), status: z.boolean() }),
            ),
            locks: z.array(
              z.object({ name: z.string(), isLocked: z.boolean() }),
            ),
          }),
        }),
        generate: async function* ({ hub: newHub }) {
          hub = newHub;
          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "updateHub",
                  args: { hub },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "updateHub",
                  toolCallId,
                  result: `The hub has been updated with the new values`,
                },
              ],
            },
          ]);

          return <Message role="assistant" content={<HubView hub={hub} />} />;
        },
      },
      viewUsage: {
        description: "view current usage for electricity, water, or gas",
        parameters: z.object({
          type: z.enum(["electricity", "water", "gas"]),
        }),
        generate: async function* ({ type }) {
          const toolCallId = generateId();

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "viewUsage",
                  args: { type },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolName: "viewUsage",
                  toolCallId,
                  result: `The current usage for ${type} is currently displayed on the screen`,
                },
              ],
            },
          ]);

          return (
            <Message role="assistant" content={<UsageView type={type} />} />
          );
        },
      },
    },
  });

  return stream;
};

export type UIState = Array<ReactNode>;

export type AIState = {
  chatId: string;
  messages: Array<CoreMessage>;
};

export const AI = createAI<AIState, UIState>({
  initialAIState: {
    chatId: generateId(),
    messages: [],
  },
  initialUIState: [],
  actions: {
    sendMessage,
  },
  onSetAIState: async ({ state, done }) => {
    "use server";

    if (done) {
      // save to database
    }
  },
});
