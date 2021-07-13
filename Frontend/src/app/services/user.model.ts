export class User {
  constructor(
    private id: String,
    private isTailor: Boolean,
    private token: String
  ) {}

  get Token() {
    if (!this.token) return null;
    return this.token;
  }

  get Id() {
    if (!this.id) return null;
    return this.id;
  }

  get IsTailor() {
    if (!this.isTailor) return null;
    return this.isTailor;
  }
}
//  save user data In-memory storage
//  next step save user data In-wab storage
