interface ComponentProps {
  list: string[];
  current: number;
  originTransfer?: (index: number) => string | Promise<string | undefined>;
}

export interface ImageModalConfig {
  componentProps: ComponentProps;
}
