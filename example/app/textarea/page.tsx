import Button from "@/components/button";

function TextArea() {
  return (
    <div className="w-full max-w-xl rounded-2xl p-6 mx-auto bg-black/10 dark:bg-white/10 backdrop-blur-2xl backdrop-saturate-200">
      <h1 className="text-xl font-bold">🏗️ TextArea is coming soon!</h1>
      <p className="mt-2 text-sm opacity-70">
        We're building the future of text input, and we'd love your unique
        perspective. Join our community of innovators—fork the repo, and let's
        craft this together!
      </p>
      <div className="flex items-center gap-3 mt-6">
        <a
          href="https://github.com/ponlponl123/react-smooth-input/fork"
          target="_blank"
        >
          <Button className="w-max bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white">
            Let's Fork
          </Button>
        </a>
        <span className="text-xs opacity-20">OR</span>
        <a
          href="https://github.com/ponlponl123/react-smooth-input/compare"
          target="_blank"
        >
          <Button className="w-max bg-purple-900 hover:bg-purple-700 hover:dark:bg-purple-950 text-white">
            Pull Request
          </Button>
        </a>
      </div>
    </div>
  );
}

export default TextArea;
