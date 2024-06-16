type CreateModelRequest = {
  name: string;
  description: string;
  queueName: string;
  type: { id: string };
};

export { type CreateModelRequest };
