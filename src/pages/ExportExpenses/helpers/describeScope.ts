/**
 * The scope as a phrase for a report heading: "All expenses", "Personal expenses and 2 groups".
 * The budget form's own wording ("(2) groups and personal expenses") is built for a button, not
 * for the top of a page someone may print.
 */
export const describeScope = (
  scope: { personal: boolean; group: boolean; nonGroup: boolean },
  allGroupsSelected: boolean,
  targetGroupCount: number
): string => {
  const { personal, group, nonGroup } = scope;
  const everyGroup = allGroupsSelected || targetGroupCount === 0;

  if (personal && group && nonGroup && everyGroup) return 'All expenses';

  const parts: string[] = [];
  if (personal) parts.push('personal expenses');
  if (nonGroup) parts.push('quick splits');
  if (group) {
    parts.push(
      everyGroup
        ? 'all groups'
        : targetGroupCount === 1
          ? '1 group'
          : `${targetGroupCount} groups`
    );
  }

  if (parts.length === 0) return 'Nothing selected';

  const sentence =
    parts.length === 1
      ? parts[0]
      : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;

  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};
