export class LoggingService{
  public logs:any[] = [];

  printLog(message:any){
    console.log(message)
    this.logs.push(message)
  }
}
