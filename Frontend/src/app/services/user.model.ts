export class User {
  constructor(
    private id: String,
    private isTailor: Boolean,
    private token: String
  ) {}

  get Token(): String | null {
    if (!this.token) return null;
    return this.token;
  }

  get Id(): String | null {
    if (!this.id) return null;
    return this.id;
  }

  get IsTailor(): Boolean | null {
    if (!this.isTailor) return null;
    return this.isTailor;
  }
}

