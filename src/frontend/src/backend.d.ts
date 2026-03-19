import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface backendInterface {
    getContacts(): Promise<Array<{
        subject: string;
        name: string;
        email: string;
        message: string;
        phone: string;
    }>>;
    getDownloads(): Promise<Array<{
        title: string;
        description: string;
        category: string;
        fileUrl: string;
    }>>;
    getNotifications(): Promise<Array<{
        title: string;
        date: Time;
        message: string;
        category: string;
    }>>;
    getVillageInfo(): Promise<{
        area: number;
        district: string;
        state: string;
        villageName: string;
        wards: bigint;
        population: bigint;
        households: bigint;
    }>;
    initialize(): Promise<void>;
    submitContactForm(name: string, phone: string, email: string, message: string, subject: string): Promise<void>;
}
