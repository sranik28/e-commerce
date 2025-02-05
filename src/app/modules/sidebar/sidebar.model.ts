import mongoose, { Schema } from "mongoose";
import { TSideBarCategory, TSubSideBarCategory } from "./sidebar.interface";


const SideBarCategorySchema = new Schema<TSideBarCategory>({
    name: { type: String, required: true },
    href: { type: String, required: true },
    subItem : {type: [String] , ref:"SubSideBarCategory" , default:[]}
  });
  
  // Mongoose schema for SubSideBarCategory
  const SubSideBarCategorySchema = new Schema<TSubSideBarCategory>({
    name: { type: String, required: true },
    href: { type: String, required: true },
    refCategory: { type: String, ref: 'SideBarCategory', required: true },
    subItem : {type: [String] , ref:"SubSideBarCategory" , default:[]}
  });
  
  // Creating models
  const SideBarCategory = mongoose.model<TSideBarCategory>('SideBarCategory', SideBarCategorySchema);
  const SubSideBarCategory = mongoose.model<TSubSideBarCategory>('SubSideBarCategory', SubSideBarCategorySchema);
  
  export { SideBarCategory, SubSideBarCategory };