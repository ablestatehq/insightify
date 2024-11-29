export type IDialogProps = {
  title: string;
  message: string;
  visible: boolean;
  error?: Error | null;
  acceptText?: string;
  cancelText: string;
  onAccept?: () => void;
  onReject: () => void;
};

export type TalentSubmissionForm = {
  need: string
  email: string
  phone: string
  heads?: number// Quantity needed.
  client: string// Client name
  company?:string
  message: string// Message left
}
