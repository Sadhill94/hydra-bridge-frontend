/* istanbul ignore file */

export function removeDynamicIdFromSnapshot(
  fragment: DocumentFragment
): string {
  return fragment.toString().replace(/id(.*)"(.*)"/g, "");
}
