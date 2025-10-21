/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Categories = "categories",
	Conversations = "conversations",
	Jobs = "jobs",
	Orders = "orders",
	Payments = "payments",
	Proposals = "proposals",
	ProviderProfiles = "provider_profiles",
	Reviews = "reviews",
	Skills = "skills",
	UserSkill = "user_skill",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

export type GeoPoint = {
	lon: number
	lat: number
}

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type CategoriesRecord = {
	created?: IsoDateString
	description: string
	id: string
	name: string
	parent_id: string
	slug: string
	updated?: IsoDateString
}

export type ConversationsRecord<Tparticipants = unknown> = {
	created?: IsoDateString
	getstream_channel_id: string
	id: string
	order_id: RecordIdString
	participants: null | Tparticipants
	updated?: IsoDateString
}

export enum JobsStatueOptions {
	"open" = "open",
	"assigned" = "assigned",
	"completed" = "completed",
	"cancelled" = "cancelled",
}

export enum JobsJobTypeOptions {
	"remote" = "remote",
	"onsite" = "onsite",
}
export type JobsRecord = {
	address?: string
	buyer_id: RecordIdString
	category_id: RecordIdString[]
	created?: IsoDateString
	currency: string
	description: string
	geolocation?: GeoPoint
	id: string
	job_type: JobsJobTypeOptions[]
	max_budget: number
	statue: JobsStatueOptions
	tilte: string
	updated?: IsoDateString
}

export enum OrdersStatusOptions {
	"active" = "active",
	"delivered" = "delivered",
	"completed" = "completed",
	"cancelled" = "cancelled",
	"disputed" = "disputed",
}
export type OrdersRecord = {
	agreed_price: number
	buyer_id: RecordIdString
	created?: IsoDateString
	currency: string
	deu_date?: IsoDateString
	escrow_funded?: boolean
	id: string
	job_id: RecordIdString[]
	provider_id: RecordIdString[]
	status: OrdersStatusOptions
	updated?: IsoDateString
}

export enum PaymentsStatusOptions {
	"pending" = "pending",
	"completed" = "completed",
	"failed" = "failed",
	"refunded" = "refunded",
}
export type PaymentsRecord = {
	amount: number
	commission: number
	created?: IsoDateString
	id: string
	order_id: RecordIdString[]
	payment_gateway: string
	payment_gateway_ref: string
	status: PaymentsStatusOptions
	updated?: IsoDateString
}

export enum ProposalsStatusOptions {
	"pending" = "pending",
	"accepted" = "accepted",
	"rejected" = "rejected",
	"withdrawn" = "withdrawn",
}
export type ProposalsRecord = {
	cover_letter?: string
	created?: IsoDateString
	currency: string
	id: string
	job_id: RecordIdString[]
	proposed_price: number
	provider_id: RecordIdString[]
	status: ProposalsStatusOptions
	updated?: IsoDateString
}

export type ProviderProfilesRecord<Tavailability = unknown, Tlanguages = unknown> = {
	availability?: null | Tavailability
	bio: string
	content: string[]
	created?: IsoDateString
	current_geolocation: GeoPoint
	id: string
	languages?: null | Tlanguages
	rating?: number
	services: RecordIdString[]
	total_review?: number
	updated?: IsoDateString
	user_id: RecordIdString
}

export type ReviewsRecord = {
	comment: string
	created?: IsoDateString
	id: string
	order_id: RecordIdString
	rating?: number
	reviewee_id: RecordIdString
	reviewer_id: RecordIdString
	updated?: IsoDateString
}

export type SkillsRecord = {
	created?: IsoDateString
	id: string
	name: string
	slug: string
	updated?: IsoDateString
}

export type UserSkillRecord = {
	created?: IsoDateString
	id: string
	skill_id: RecordIdString[]
	updated?: IsoDateString
	user_id: RecordIdString
}

export enum UsersRoleOptions {
	"buyer" = "buyer",
	"provider" = "provider",
	"both" = "both",
}
export type UsersRecord = {
	avatar?: string
	country: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	first_name: string
	id: string
	identie_verify?: boolean
	last_name: string
	password: string
	phone: number
	role: UsersRoleOptions
	tokenKey: string
	updated?: IsoDateString
	username: string
	verifcation_image: string[]
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type CategoriesResponse<Texpand = unknown> = Required<CategoriesRecord> & BaseSystemFields<Texpand>
export type ConversationsResponse<Tparticipants = unknown, Texpand = unknown> = Required<ConversationsRecord<Tparticipants>> & BaseSystemFields<Texpand>
export type JobsResponse<Texpand = unknown> = Required<JobsRecord> & BaseSystemFields<Texpand>
export type OrdersResponse<Texpand = unknown> = Required<OrdersRecord> & BaseSystemFields<Texpand>
export type PaymentsResponse<Texpand = unknown> = Required<PaymentsRecord> & BaseSystemFields<Texpand>
export type ProposalsResponse<Texpand = unknown> = Required<ProposalsRecord> & BaseSystemFields<Texpand>
export type ProviderProfilesResponse<Tavailability = unknown, Tlanguages = unknown, Texpand = unknown> = Required<ProviderProfilesRecord<Tavailability, Tlanguages>> & BaseSystemFields<Texpand>
export type ReviewsResponse<Texpand = unknown> = Required<ReviewsRecord> & BaseSystemFields<Texpand>
export type SkillsResponse<Texpand = unknown> = Required<SkillsRecord> & BaseSystemFields<Texpand>
export type UserSkillResponse<Texpand = unknown> = Required<UserSkillRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	categories: CategoriesRecord
	conversations: ConversationsRecord
	jobs: JobsRecord
	orders: OrdersRecord
	payments: PaymentsRecord
	proposals: ProposalsRecord
	provider_profiles: ProviderProfilesRecord
	reviews: ReviewsRecord
	skills: SkillsRecord
	user_skill: UserSkillRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	categories: CategoriesResponse
	conversations: ConversationsResponse
	jobs: JobsResponse
	orders: OrdersResponse
	payments: PaymentsResponse
	proposals: ProposalsResponse
	provider_profiles: ProviderProfilesResponse
	reviews: ReviewsResponse
	skills: SkillsResponse
	user_skill: UserSkillResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'categories'): RecordService<CategoriesResponse>
	collection(idOrName: 'conversations'): RecordService<ConversationsResponse>
	collection(idOrName: 'jobs'): RecordService<JobsResponse>
	collection(idOrName: 'orders'): RecordService<OrdersResponse>
	collection(idOrName: 'payments'): RecordService<PaymentsResponse>
	collection(idOrName: 'proposals'): RecordService<ProposalsResponse>
	collection(idOrName: 'provider_profiles'): RecordService<ProviderProfilesResponse>
	collection(idOrName: 'reviews'): RecordService<ReviewsResponse>
	collection(idOrName: 'skills'): RecordService<SkillsResponse>
	collection(idOrName: 'user_skill'): RecordService<UserSkillResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
