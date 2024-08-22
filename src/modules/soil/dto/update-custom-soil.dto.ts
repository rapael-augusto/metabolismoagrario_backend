import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomSoilDto } from "./create-custom-soil.dto";

export class UpdateCustomSoilDto extends PartialType(CreateCustomSoilDto) {}