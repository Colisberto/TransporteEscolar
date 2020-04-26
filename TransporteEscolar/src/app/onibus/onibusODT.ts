export class OnibusODT{

  public placa: string;
  public modelo: string;
  public qtdAcentos: string;
  public anoFabricacao: string;

  constructor( placa: string, modelo: string, qtdAcentos: string, anoFabricacao: string) {
    this.placa = placa;
    this.modelo = modelo;
    this.qtdAcentos = qtdAcentos;
    this.anoFabricacao = anoFabricacao;
  }
}
