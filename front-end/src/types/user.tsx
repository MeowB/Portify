interface UserType {
	email: string,
	password: string
}

interface User {
	id: string,
	email: string,
	profileImageUrl: string
}

interface UserContextType {
	user: User | null,
	setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export type { UserType, User, UserContextType}