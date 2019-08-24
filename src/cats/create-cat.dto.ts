export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export type CatKeys = keyof CreateCatDto;
