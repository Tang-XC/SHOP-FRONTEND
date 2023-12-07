export interface Message {
  type: string;
  icon?: React.ReactNode;
  title?: string;
  content: string;
  delay?: number;
}