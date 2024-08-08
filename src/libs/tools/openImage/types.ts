interface ComponentProps {
  list: string[];
  current: number;
  originTransfer: (index: number) => string;
}

export interface ImageModalConfig {
  componentProps: ComponentProps;
}
