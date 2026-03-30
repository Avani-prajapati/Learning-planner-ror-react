import { render } from "@testing-library/react";
import videojs from "video.js";
import VideoPlayer from "../components/VideoPlayer";

jest.mock("video.js", () => {
  const videojsMock = jest.fn();
  return {
    __esModule: true,
    default: videojsMock,
  };
});

describe("VideoPlayer", () => {
  const mockedVideojs = videojs as unknown as jest.Mock;

  beforeEach(() => {
    mockedVideojs.mockReset();
  });

  test("initializes video.js when src is provided", () => {
    const dispose = jest.fn();
    mockedVideojs.mockReturnValue({ dispose });

    render(<VideoPlayer src="https://cdn.example.com/video.mp4" />);

    expect(mockedVideojs).toHaveBeenCalledTimes(1);

    const [videoElement, options] = mockedVideojs.mock.calls[0];

    expect(videoElement.tagName.toLowerCase()).toBe("video-js");
    expect(options).toMatchObject({
      controls: true,
      fluid: true,
      autoplay: false,
      preload: "auto",
      sources: [
        { src: "https://cdn.example.com/video.mp4", type: "video/mp4" },
      ],
    });
  });

  test("does not initialize video.js when src is empty", () => {
    render(<VideoPlayer src="" />);

    expect(mockedVideojs).not.toHaveBeenCalled();
  });

  test("disposes previous player when src changes", () => {
    const firstDispose = jest.fn();
    const secondDispose = jest.fn();

    mockedVideojs
      .mockReturnValueOnce({ dispose: firstDispose })
      .mockReturnValueOnce({ dispose: secondDispose });

    const { rerender } = render(<VideoPlayer src="first.mp4" />);

    rerender(<VideoPlayer src="second.mp4" />);

    expect(firstDispose).toHaveBeenCalledTimes(1);
    expect(mockedVideojs).toHaveBeenCalledTimes(2);
  });

  test("disposes player on unmount", () => {
    const dispose = jest.fn();
    mockedVideojs.mockReturnValue({ dispose });

    const { unmount } = render(<VideoPlayer src="video.mp4" />);

    unmount();

    expect(dispose).toHaveBeenCalledTimes(1);
  });
});
