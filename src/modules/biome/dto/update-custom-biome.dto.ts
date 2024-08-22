import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomBiomeDto } from "./create-custom-biome.dto";

export class UpdateCustomBiomeDto extends PartialType(CreateCustomBiomeDto) {
}