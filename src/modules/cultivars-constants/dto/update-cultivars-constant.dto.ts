import { CreateCultivarConstantDto } from "./create-cultivars-constant.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCultivarsConstantDto extends PartialType(CreateCultivarConstantDto) {
}