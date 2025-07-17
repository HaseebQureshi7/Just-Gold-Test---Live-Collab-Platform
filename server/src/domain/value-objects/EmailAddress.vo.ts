export class EmailAddress {
    private readonly email: string;
  
    constructor(email: string) {
      if (!this.isValid(email)) {
        throw new Error("Invalid email format");
      }
      this.email = email;
    }
  
    private isValid(email: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    get value(): string {
      return this.email;
    }
  }
  