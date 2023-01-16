import { ColorComp, GameObj, PosComp, RectComp, Vec2 } from 'kaboom';
import kctx from './kctx';

type Paddle = GameObj<PosComp | RectComp | ColorComp>;
type PaddlePosition = 'left' | 'bottom' | 'right' | 'top';

const PADDLE_SPEED = 10;
const PADDLE_MAX_TOP = 50;

function getPaddlePos(position: PaddlePosition): Vec2 {
  switch (position) {
    case 'left':
      return kctx.vec2(20, kctx.height() / 2);
    case 'right':
      return kctx.vec2(kctx.width() - 20, kctx.height() / 2);
    case 'bottom':
      return kctx.vec2(kctx.width() / 2, kctx.height() - 20);
    case 'top':
      return kctx.vec2(kctx.width() / 2, 20);
  }
}

function getPaddleSize(position: PaddlePosition): [number, number] {
  switch (position) {
    case 'bottom':
    case 'top':
      return [200, 10];
    case 'left':
    case 'right':
      return [10, 200];
  }
}

function createPaddle(position: PaddlePosition): Paddle {
  const [width, height] = getPaddleSize(position);
  return kctx.add([
    kctx.pos(getPaddlePos(position)),
    kctx.rect(width, height),
    kctx.color(kctx.WHITE),
    kctx.origin('center'),
  ]);
}

function gameScene(): void {
  const leftPadle = createPaddle('left');
  const rightPadle = createPaddle('right');
  const topPadle = createPaddle('top');
  const bottomPadle = createPaddle('bottom');

  onKeyDown('left', () => {
    const topPaddleLeftX = topPadle.pos.x - topPadle.width / 2;
    if (topPaddleLeftX < PADDLE_MAX_TOP) {
      topPadle.pos.x = topPadle.width / 2 + PADDLE_MAX_TOP;
    }
    topPadle.pos.x -= PADDLE_SPEED;

    const bottomPaddleLeftX = bottomPadle.pos.x - bottomPadle.width / 2;
    if (bottomPaddleLeftX < PADDLE_MAX_TOP) {
      bottomPadle.pos.x = bottomPadle.width / 2 + PADDLE_MAX_TOP;
    }
    bottomPadle.pos.x -= PADDLE_SPEED;
  });

  onKeyDown('right', () => {
    const topPaddleRightX = topPadle.pos.x + topPadle.width / 2;
    if (topPaddleRightX > kctx.width() - PADDLE_MAX_TOP) {
      topPadle.pos.x = kctx.width() - topPadle.width / 2 - PADDLE_MAX_TOP;
    }
    topPadle.pos.x += PADDLE_SPEED;

    const bottomPaddleRightX = bottomPadle.pos.x + bottomPadle.width / 2;
    if (bottomPaddleRightX > kctx.width() - PADDLE_MAX_TOP) {
      bottomPadle.pos.x = kctx.width() - bottomPadle.width / 2 - PADDLE_MAX_TOP;
    }
    bottomPadle.pos.x += PADDLE_SPEED;
  });

  onKeyDown('up', () => {
    const leftPaddleTopY = leftPadle.pos.y - leftPadle.height / 2;
    if (leftPaddleTopY < PADDLE_MAX_TOP) {
      leftPadle.pos.y = PADDLE_MAX_TOP + leftPadle.height / 2;
    }
    leftPadle.pos.y -= PADDLE_SPEED;

    if (rightPadle.pos.y - rightPadle.height / 2 < PADDLE_MAX_TOP) {
      rightPadle.pos.y = PADDLE_MAX_TOP + rightPadle.height / 2;
    }
    rightPadle.pos.y -= PADDLE_SPEED;
  });

  onKeyDown('down', () => {
    const leftPaddleBottomY = leftPadle.pos.y + leftPadle.height / 2;
    if (leftPaddleBottomY > kctx.height() - PADDLE_MAX_TOP) {
      leftPadle.pos.y = kctx.height() - PADDLE_MAX_TOP - leftPadle.height / 2;
    }
    leftPadle.pos.y += PADDLE_SPEED;

    const rightPaddleBottomY = rightPadle.pos.y + rightPadle.height / 2;
    if (rightPaddleBottomY > kctx.height() - PADDLE_MAX_TOP) {
      rightPadle.pos.y = kctx.height() - PADDLE_MAX_TOP - rightPadle.height / 2;
    }
    rightPadle.pos.y += PADDLE_SPEED;
  });
}

export default gameScene;
