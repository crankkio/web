import type { WalletValidation } from "@app/validation/moduleConfig/wallet.js";
import { DynamicForm } from "@components/Form/DynamicForm.js";
import { useDevice } from "@core/stores/deviceStore.js";
import { Protobuf } from "@meshtastic/js";

export const Wallet = (): JSX.Element => {
  const { moduleConfig, setWorkingModuleConfig } = useDevice();

  const onSubmit = (data: WalletValidation) => {
    setWorkingModuleConfig(
      new Protobuf.ModuleConfig.ModuleConfig({
        payloadVariant: {
          case: "wallet",
          value: data,
        },
      }),
    );
  };

  return (
    <DynamicForm<WalletValidation>
      onSubmit={onSubmit}
      defaultValues={moduleConfig.wallet}
      fieldGroups={[
        {
          label: "Wallet Settings",
          description: "Settings for the Wallet module",
          fields: [
            {
              type: "toggle",
              name: "enabled",
              label: "Module Enabled",
              description: "Enable Wallet",
            },
            {
              type: "text",
              name: "publicKey",
              label: "Public Key",
              description: "Public Key",
              disabledBy: [
                {
                  fieldName: "enabled",
                },
              ],
            },
            {
              type: "text",
              name: "privateKey",
              label: "Private Key",
              description: "Private Key",
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
