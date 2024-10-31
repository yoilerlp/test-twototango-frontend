import { z } from 'zod';
import { schemesMessages } from '@/utils/schemes';

export const RegisterSchema = z.object({
  name: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .min(1, schemesMessages.requiredField),
  lastName: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .min(1, schemesMessages.requiredField),
  email: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .email(schemesMessages.invalidEmail),
  password: z
    .string({
      required_error: schemesMessages.requiredField,
      invalid_type_error: schemesMessages.requiredField,
    })
    .min(8, schemesMessages.passwordLength),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

