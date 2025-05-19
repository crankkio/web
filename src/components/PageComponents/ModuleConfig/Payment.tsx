import type { PaymentValidation } from "@app/validation/moduleConfig/payment.ts";
import { DynamicForm } from "@components/Form/DynamicForm.js";
import { useDevice } from "@core/stores/deviceStore.js";
import { Protobuf } from "@meshtastic/js";

export const Payment = (): JSX.Element => {
  const { moduleConfig, setWorkingModuleConfig } = useDevice();

  const onSubmit = (data: PaymentValidation) => {
    setWorkingModuleConfig(
      new Protobuf.ModuleConfig.ModuleConfig({
        payloadVariant: {
          case: "payment",
          value: data,
        },
      }),
    );
  };

  return (
    <DynamicForm<PaymentValidation>
      onSubmit={onSubmit}
      defaultValues={moduleConfig.payment}
      fieldGroups={[
        {
          label: "Payment settings",
          description: "Allow payments to be sent and received",
          fields: [
            {
              type: "toggle",
              name: "enabled",
              label: "Paymens active",
              description: "Enable payments to be sent and received",
            },
            {
              type: "text",
              name: "wallet",
              label: "Wallet",
              description: "Wallet address to send payment to",
              disabledBy: [
                {
                  fieldName: "enabled",
                },
              ],
            },
            {
              type: "text",
              name: "amount",
              label: "Amount",
              description: "Amount to send",
              disabledBy: [
                {
                  fieldName: "enabled",
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};
