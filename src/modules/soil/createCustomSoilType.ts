import { PrismaClient, ConstantTypes, IrrigationTypes, CultivationSystem, SoilTypes } from '@prisma/client';
const prisma = new PrismaClient();

async function createCustomSoilType(name: string) {
  try {
    const customSoil = await prisma.customSoilType.create({
      data: {
        name,
      },
    });
    return customSoil;
  } catch (error) {
    console.error('Error creating custom soil type:', error);
    throw error;
  }
}

async function createConstantWithSoil(data: {
  value: number;
  reference: string;
  type: ConstantTypes; 
  comment?: string;
  climate?: string;
  biome?: string;
  irrigation?: IrrigationTypes; 
  country?: string;
  soil?: SoilTypes; 
  cultivationSystem?: CultivationSystem; 
  customSoilId?: string;  
  cultivarId: string;
  bibliographicReferenceId?: number;  
}) {
  try {
    const constant = await prisma.constant.create({
      data: {
        ...data,
      },
    });
    return constant;
  } catch (error) {
    console.error('Error creating constant:', error);
    throw error;
  }
}

(async () => {
  const newSoil = await createCustomSoilType('Loamy');
  console.log('Created new custom soil type:', newSoil);

  const newConstant = await createConstantWithSoil({
    value: 1.5,
    reference: 'Some reference',
    type: ConstantTypes.HARVEST_INDEX,
    customSoilId: newSoil.id, 
    cultivarId: 'some-cultivar-id',
  });
  console.log('Created new constant with custom soil type:', newConstant);
})();
