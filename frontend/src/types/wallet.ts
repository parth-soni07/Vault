export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
}

export interface EIP6963Provider {
  request: (args: { method: string }) => Promise<string[]>;
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP6963Provider;
}
