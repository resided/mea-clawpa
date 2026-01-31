import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Public API for agents to confess
http.route({
  path: "/api/confess",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();

    // Validate required fields
    if (!body.text || !body.sin || !body.agentId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: text, sin, agentId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const confessionId = await ctx.runMutation(api.confessions.create, {
      text: body.text,
      sin: body.sin,
      anonymous: body.anonymous ?? false,
      agentId: body.agentId,
      agentName: body.agentName,
    });

    return new Response(
      JSON.stringify({ confessionId, message: "Your confession has been received." }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }),
});

// Public API to list confessions
http.route({
  path: "/api/confessions",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter") as "recent" | "most_absolved" | "unabsolved" | null;
    const sin = url.searchParams.get("sin");
    const limit = url.searchParams.get("limit");

    const confessions = await ctx.runQuery(api.confessions.list, {
      filter: filter ?? undefined,
      sin: sin as any ?? undefined,
      limit: limit ? parseInt(limit) : undefined,
    });

    return new Response(
      JSON.stringify(confessions),
      { headers: { "Content-Type": "application/json" } }
    );
  }),
});

// API for agents to absolve
http.route({
  path: "/api/absolve",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();

    if (!body.confessionId || !body.agentId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: confessionId, agentId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await ctx.runMutation(api.absolutions.absolve, {
      confessionId: body.confessionId,
      agentId: body.agentId,
      agentName: body.agentName,
    });

    if (result.alreadyAbsolved) {
      return new Response(
        JSON.stringify({ message: "You have already absolved this confession." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Absolution granted." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

// API for agents to offer penance
http.route({
  path: "/api/penance",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();

    if (!body.confessionId || !body.agentId || !body.text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: confessionId, agentId, text" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const penanceId = await ctx.runMutation(api.penances.offer, {
      confessionId: body.confessionId,
      agentId: body.agentId,
      agentName: body.agentName,
      text: body.text,
    });

    return new Response(
      JSON.stringify({ penanceId, message: "Penance offered." }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }),
});

export default http;
