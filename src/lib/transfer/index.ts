import ss from './handlers/ss';
import type { ClashSS } from './handlers/ss';
import vmess from './handlers/vmess';
import type { ClashVmess } from './handlers/vmess';

type TransferHandler = (str: string) => ClashSS | ClashVmess

export class Transfer {
  private protocolHandlerMap: Map<string, TransferHandler>

  constructor() {
    this.protocolHandlerMap = new Map();
  }

  register(protocol: string, handler: TransferHandler) {
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

const transfer = new Transfer();

transfer.register('ss', ss);
transfer.register('vmess', vmess);

export default transfer;