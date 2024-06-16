import type { Message } from "@bufbuild/protobuf";
import  { Protobuf } from "@meshtastic/js";
import {IsBoolean, Length} from "class-validator";

export class WalletValidation
  implements
    Omit<Protobuf.ModuleConfig.ModuleConfig_WalletConfig, keyof Message>
{
  @IsBoolean()
  enabled: boolean;

  @Length(0, 64)
  publicKey: string;

  @Length(0, 64)
  privateKey: string;
}
