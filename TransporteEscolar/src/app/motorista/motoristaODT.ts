export class MotoristaODT{

  public cpf: string;
  public nome: string;
  public email: string;
  public telefone: string;
  public dataNascimento: Date;


  constructor( cpf: string, nome: string, email: string, telefone: string, dataNascimento: Date) {
    this.cpf = cpf;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;

  }

}
