import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { OptionsToolbarProps } from "../../../../interfaces";
import { $getNodeByKey } from "lexical";
import { StyledOptionsToolbar } from "./OptionsToolbar.styled";
import Pill from "../../../Pill/Pill";
import { FilteredResultItem, GroupedItem } from "../../../../types";

const OptionsToolBar = ({
  editorStateString,
  filteredResults,
  setFilteredResults,
}: OptionsToolbarProps) => {
  const { insertMention } = useBeautifulMentions();
  const [editor] = useLexicalComposerContext();

  const groupedResults: GroupedItem = filteredResults.reduce((acc, item) => {
    const key = item.prop as string;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ ...item, prop: key } as FilteredResultItem);
    return acc;
  }, {} as GroupedItem);

  return (
    <>
      {editorStateString === ""
        ? null
        : Object.entries(groupedResults).map(([prop, results]) => (
            <StyledOptionsToolbar key={prop}>
              <div className="categoryAndTypesWrapper">
                <div className="category">{prop}</div>
                <div className="types">
                  {results.map((result, index) => (
                    <Pill
                      $textColor="#FFFFFF"
                      color="#131519c9"
                      title={result.value}
                      closeButton={false}
                      $border={true}
                      onClick={() => {
                        
                        editor.update(() => {
                          const nodeMap = editor._editorState._nodeMap;
                          let lastTextNodeKey = null;
                          for (let [key, node] of nodeMap.entries()) {
                            if (node.__type === "text") {
                              lastTextNodeKey = key;
                            }
                          }
                          if (lastTextNodeKey) {
                            const lastTextNode = $getNodeByKey(lastTextNodeKey);
                            if (lastTextNode) {
                              lastTextNode.remove();
                            }
                          }
                          insertMention({
                            trigger: result.prop + ":",
                            value: result.value,
                            data: { memberId: result.memberId },
                          });
                          setFilteredResults([]);
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            </StyledOptionsToolbar>
          ))}
    </>
  );
};

export default OptionsToolBar;
