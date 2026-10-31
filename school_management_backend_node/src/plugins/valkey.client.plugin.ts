import fastifyPlugin from "fastify-plugin";
import { GlideClient } from "@valkey/valkey-glide";

const valkeyClientPlugin = async (fastify) => {
    let client: GlideClient;
    try {
        client = await GlideClient.createClient({
            addresses: [{
                host: '127.0.0.1',
                port: 6379
            }]
        })


        fastify.decorate('valkeyClient', client)
    } catch (error) {
        fastify.log.error("Failed to connect to valkey server")
    }
}

export default fastifyPlugin(valkeyClientPlugin);