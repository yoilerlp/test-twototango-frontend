import { z } from 'zod';
import { schemesMessages } from '@/utils/schemes';
import { TaskStatus } from '@/interfaces/task';

export const TaskSchema = z.object({
  title: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .min(1, schemesMessages.requiredField),
  description: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .min(1, schemesMessages.requiredField),
  dueDate: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: schemesMessages.date,
    }),
  status: z.nativeEnum(TaskStatus, {
    message: schemesMessages.statusmsg,
    required_error: schemesMessages.requiredField,
    invalid_type_error: schemesMessages.statusmsg,
  }),
});

export type CreateTaskSchema = z.infer<typeof TaskSchema>;

