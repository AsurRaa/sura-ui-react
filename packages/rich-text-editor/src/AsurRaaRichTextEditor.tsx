/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import "./css/example.css";
import "./css/draft.css";
import "./css/rich.css";
import React, { FC, useEffect } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
const { useState, useRef, useCallback } = React;

export interface AsurRaaRichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const AsurRaaRichTextEditor: FC<AsurRaaRichTextEditorProps> = (
  props
) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    props.onChange?.(html);
  }, [editorState, props]);

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue !== null) {
      const editorState = EditorState.createWithContent(
        // @ts-ignore
        convertFromHTML(props.defaultValue)
      );
      setEditorState(editorState);
    }
  }, [props.defaultValue]);

  const focus = () => {
    // @ts-ignore
    if (editor.current) editor.current.focus();
  };

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [setEditorState]
  );

  const mapKeyToEditorCommand = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            editorState,
            4 /* maxDepth */
          );
          if (newEditorState !== editorState) {
            setEditorState(newEditorState);
          }
          return null;
      }
      return getDefaultKeyBinding(e);
    },
    [editorState, setEditorState]
  );

  let className = "RichEditor-editor";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType: string) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType);
          setEditorState(newState);
        }}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle: string) => {
          const newState = RichUtils.toggleInlineStyle(
            editorState,
            inlineStyle
          );
          setEditorState(newState);
        }}
      />
      <div className={className} onClick={focus}>
        <Editor
          // @ts-ignore
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Tell a story..."
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    // eslint-disable-next-line quotes
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block: any) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const StyleButton = ({ onToggle, active, label, style }: any) => {
  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
];

const BlockStyleControls = ({ editorState, onToggle }: any) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = ({ editorState, onToggle }: any) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
