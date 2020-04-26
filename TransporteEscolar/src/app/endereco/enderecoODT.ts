export class EnderecoODT{

  public cidade: string;
  public endereco: string;
  public bairro: string;
  public cep: string;
  public uf: string;

  constructor( cidade: string, endereco: string, bairro: string, cep: string, uf: string) {
    this.cidade = cidade;
    this.endereco = endereco;
    this.bairro = bairro;
    this.cep = cep;
    this.uf = uf;
  }

}
