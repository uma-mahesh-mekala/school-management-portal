import fastifyPlugin from "fastify-plugin";
import { NodeCache, NodeCacheOptions } from '@cacheable/node-cache';
import { FastifyInstance } from "fastify";

const cachePlugin = async (fastify: FastifyInstance) => {
    const cacheOptions: NodeCacheOptions = {
        stdTTL: 300,
        checkperiod: 300,
        deleteOnExpire: true,
        maxKeys: -1
    }
    const cacheClient = new NodeCache(cacheOptions);

    cacheClient.on('set', (key, value) => {
        fastify.log.info(`Key ${key} has been set with value ${value}`)
    })

    cacheClient.on('expired', (key, value) => {
        fastify.log.info(`Key ${key} is expired`)
    })

    cacheClient.on('del', (key, value) => {
        fastify.log.info(`Key ${key} has been deleted`)
    })

    const invalidateCache = (pattern?: string) => {
        const keys = cacheClient.keys();
        const keysToInvalidate = pattern ? keys.filter((key) => key.startsWith(pattern)) : keys;
        cacheClient.del(keysToInvalidate);
        return;
    }

    fastify.decorate('cacheClient', cacheClient)
    fastify.decorate('invalidateCache', invalidateCache);
}

export default fastifyPlugin(cachePlugin, {
    name: 'cache-plugin',
    dependencies: ['app-config-plugin']
})