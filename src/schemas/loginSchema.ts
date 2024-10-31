import { z } from 'zod';
import { schemesMessages } from '@/utils/schemes';

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .email(schemesMessages.invalidEmail),
  password: z.string({
    required_error: schemesMessages.requiredField,
    invalid_type_error: schemesMessages.requiredField,
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

