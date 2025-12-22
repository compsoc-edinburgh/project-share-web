import {
  KeyboardKey,
  KeyboardLabel,
  KeyboardLayout,
} from "@/components/keyboard";

export const ShortcutsFooter = () => {
  return (
    <div className="flex gap-8 absolute bottom-10 left-10">
      <div>
        <KeyboardLayout>
          <KeyboardKey trigger="1">1</KeyboardKey>
          <KeyboardKey trigger="2">2</KeyboardKey>
          <KeyboardKey trigger="3">3</KeyboardKey>
          <KeyboardKey trigger="4">4</KeyboardKey>
        </KeyboardLayout>
        <KeyboardLabel>To section</KeyboardLabel>
      </div>
      <div>
        <KeyboardLayout>
          <KeyboardKey trigger="W">W</KeyboardKey>
          <KeyboardKey trigger="A">A</KeyboardKey>
          <KeyboardKey trigger="S">S</KeyboardKey>
          <KeyboardKey trigger="D">D</KeyboardKey>
        </KeyboardLayout>
        <KeyboardLabel>Move</KeyboardLabel>
      </div>
      <div>
        <KeyboardLayout>
          <KeyboardKey trigger="Enter">Enter</KeyboardKey>
          <KeyboardKey trigger="Escape">Esc</KeyboardKey>
        </KeyboardLayout>
        <KeyboardLabel>Edit text</KeyboardLabel>
      </div>
      <div>
        <KeyboardLayout>
          <KeyboardKey trigger="M">M</KeyboardKey>
        </KeyboardLayout>
        <KeyboardLabel>Light/dark</KeyboardLabel>
      </div>
      <div>
        <KeyboardLayout>
          <KeyboardKey trigger="C">C</KeyboardKey>
        </KeyboardLayout>
        <KeyboardLabel>High contrast</KeyboardLabel>
      </div>
      <div>
        <KeyboardLayout>
          <KeyboardKey trigger="H">H</KeyboardKey>
        </KeyboardLayout>
        <KeyboardLabel>Hide</KeyboardLabel>
      </div>
    </div>
  );
};
