declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        email: string
        role: string
        name: string
      }
    }
  }
}

export {}