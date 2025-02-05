export type TSideBarCategory = {
    name : string;
    href:string;
    subItem:string[]
}

export type TSubSideBarCategory = {
    name: string;
    href:string;
    refCategory:string,
    subItem:string[]
}