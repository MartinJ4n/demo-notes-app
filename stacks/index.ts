import StorageStack from "./StorageStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App) {
  new StorageStack(app, "storage");
}
