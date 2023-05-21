import ss from './handlers/ss';
import type { ClashSS } from './handlers/ss';
import vmess from './handlers/vmess';
import type { ClashVmess } from './handlers/vmess';

type ConverterHandler = (str: string) => ClashSS | ClashVmess

export class Converter {
  private protocolHandlerMap: Map<string, ConverterHandler>

  constructor() {
    this.protocolHandlerMap = new Map();
  }

  register(protocol: string, handler: ConverterHandler) {
    this.protocolHandlerMap.set(protocol, handler);
  }

  parse(raw: string) {
    const url = new URL(raw);
    const protocol = url.protocol.replace(':', '');
    if (this.protocolHandlerMap.has(protocol)) {
      const handler = this.protocolHandlerMap.get(protocol)!;
      return handler(raw);
    }
  }
}

const converter = new Converter();

converter.register('ss', ss);
converter.register('vmess', vmess);

export default converter;