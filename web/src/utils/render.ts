interface contentType {
  content:string,
  id: string,
  level: number
  status: string,
  title: string,
  type: string
};

// interface drawBefore2Result {
//   rect: object,
//   topArrowDot: object,
//   bottomArrowDot: object
// };

interface drawType {
    id: string,
    content: contentType,
    rect: {
      x: number,
      y: number,
      width: number,
      height: number
    },
    topArrowDot: { x: number, y: number },
    bottomArrowDot: {
      x: number,
      y: number
    }
}

function getFillColor(status: any) {
  switch (status) {
    case "S":
      return "#67C23A";
    case "E":
      return "#F56C6C";
    case "R":
      return "#409EFF";
    case "W":
      return "#909399";
    default:
      return "#909399";
  }
};

//批前 图案
// function drawBefore2(context: CanvasRenderingContext2D, pos: { x: number, y: number }, content: contentType):drawBefore2Result {
//   context.beginPath();
//   context.lineWidth = 2;
//   context.strokeStyle = "#000000";
//   context.fillStyle = "#000000";
//   context.font = "14px Arial";
//   context.textAlign = "center";

//   const titleWidth = context.measureText(content.title).width;
//   // console.log(content.content.split("进度"))
//   let content_list = content.content.split("进度")
//   // const contentWidth = context.measureText(content.content).width;
//   const contentWidth = context.measureText(content_list[0]).width;
//   const arcR = (Math.max(titleWidth, contentWidth) + 20) / 2;
//   const rectHeight = 50;
//   const width = arcR * 2;
//   const height = arcR + rectHeight;

//   context.beginPath();
//   context.arc(pos.x + arcR, pos.y + arcR, arcR, 1 * Math.PI, 2 * Math.PI);
//   context.fillStyle = getFillColor(content.status);
//   context.fill();
//   context.stroke();

//   context.beginPath();
//   context.fillStyle = "#FFFAFA";
//   context.fillRect(pos.x, pos.y + arcR, width, rectHeight);
//   context.strokeRect(pos.x, pos.y + arcR, width, rectHeight);

//   context.fillStyle = "#000000";
//   context.fillText(content.title, pos.x + arcR, pos.y + arcR * 0.8, width);
//   // context.fillText(
//   //   content.content,
//   //   pos.x + arcR,
//   //   pos.y + arcR + rectHeight / 2,
//   //   arcR * 2
//   // );
//   context.fillText(
//     content_list[0],
//     pos.x + arcR,
//     pos.y + arcR + rectHeight / 2,
//     arcR * 2
//   );
//   context.fillText(
//     "进度" + content_list[1],
//     pos.x + arcR,
//     pos.y + arcR + rectHeight / 2 + 20,
//     arcR * 2
//   );

//   return {
//     rect: { x: pos.x, y: pos.y, width: width, height: height }, //点击响应矩形区域
//     topArrowDot: { x: pos.x + width / 2, y: pos.y }, //顶部箭头连线点
//     bottomArrowDot: { x: pos.x + width / 2, y: pos.y + height } //底部箭头连线点
//   };
// };

//批前 图案2
function drawBefore(context: CanvasRenderingContext2D, pos:{x:number,y:number}, content:contentType):drawType {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = "#000000";
  context.font = "14px Arial";
  context.textAlign = "center";

  const titleWidth = context.measureText(content.title).width;
  let content_list = content.content.split("进度")
  // const contentWidth = context.measureText(content.content).width;
  const contentWidth = context.measureText(content_list[0]).width;
  const width = Math.max(titleWidth, contentWidth) + 20;
  const titleHeight = 50;
  const contentHeight = 50;
  const triangleLen = titleHeight * 0.5;

  context.beginPath();
  context.moveTo(pos.x + triangleLen, pos.y);
  context.lineTo(pos.x + width - triangleLen, pos.y);
  context.lineTo(pos.x + width, pos.y + triangleLen);
  context.lineTo(pos.x + width, pos.y + titleHeight);
  context.lineTo(pos.x, pos.y + titleHeight);
  context.lineTo(pos.x, pos.y + triangleLen);
  context.lineTo(pos.x + triangleLen, pos.y);
  context.fillStyle = getFillColor(content.status);
  context.fill();
  context.stroke();

  context.beginPath();
  context.fillStyle = "#FFFAFA";
  context.fillRect(pos.x, pos.y + titleHeight, width, contentHeight);
  context.strokeRect(pos.x, pos.y + titleHeight, width, contentHeight);

  context.fillStyle = "#000000";
  context.fillText(
    content.title,
    pos.x + width / 2,
    pos.y + titleHeight * 0.6,
    width
  );
  // context.fillText(
  //   content.content,
  //   pos.x + width / 2,
  //   pos.y + titleHeight + contentHeight / 2,
  //   width
  // );
  context.fillText(
    content_list[0],
    pos.x + width / 2,
    pos.y + titleHeight + contentHeight / 2,
    width
  );
  context.fillText(
    "进度" + content_list[1],
    pos.x + width / 2,
    pos.y + titleHeight + contentHeight / 2 + 20,
    width
  );

  return {
    id: content.id,
    content: content,
    rect: {
      x: pos.x,
      y: pos.y,
      width: width,
      height: titleHeight + contentHeight
    },
    topArrowDot: { x: pos.x + width / 2, y: pos.y },
    bottomArrowDot: {
      x: pos.x + width / 2,
      y: pos.y + titleHeight + contentHeight
    }
  };
};

//采集同步 图案
function drawSync(context: CanvasRenderingContext2D, pos:{x:number,y:number}, content:contentType):drawType {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = "#000000";
  context.font = "14px Arial";
  context.textAlign = "center";

  const titleWidth = context.measureText(content.title).width;
  let content_list = content.content.split("进度")
  // const contentWidth = context.measureText(content.content).width;
  const contentWidth = context.measureText(content_list[0]).width;
  const width = Math.max(titleWidth, contentWidth) + 20;
  // console.log("width======="+width.toString())
  const titleHeight = 50;
  const contentHeight = 50;

  context.beginPath();
  context.fillStyle = getFillColor(content.status);
  context.fillRect(pos.x, pos.y, width, titleHeight);
  context.strokeRect(pos.x, pos.y, width, titleHeight);

  context.beginPath();
  context.fillStyle = "#FFFAFA";
  context.fillRect(pos.x, pos.y + titleHeight, width, contentHeight);
  context.strokeRect(pos.x, pos.y + titleHeight, width, contentHeight);

  context.fillStyle = "#000000";
  context.fillText(
    content.title,
    pos.x + width / 2,
    pos.y + titleHeight / 2,
    width
  );
  // context.fillText(
  //   content.content,
  //   pos.x + width / 2,
  //   pos.y + titleHeight + contentHeight / 2,
  //   width
  // );
  context.fillText(
    content_list[0],
    pos.x + width / 2,
    pos.y + titleHeight + contentHeight / 2,
    width
  );
  context.fillText(
    "进度" + content_list[1],
    pos.x + width / 2,
    pos.y + titleHeight + contentHeight / 2 + 20,
    width
  );

  return {
    id: content.id,
    content: content,
    rect: {
      x: pos.x,
      y: pos.y,
      width: width,
      height: titleHeight + contentHeight
    },
    topArrowDot: { x: pos.x + width / 2, y: pos.y },
    bottomArrowDot: {
      x: pos.x + width / 2,
      y: pos.y + titleHeight + contentHeight
    }
  };
};
//存储过程 图案
function drawProc(context: CanvasRenderingContext2D, pos:{x:number,y:number}, content:contentType) :drawType {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = "#000000";
  context.font = "14px Arial";
  context.textAlign = "center";

  const titleWidth = context.measureText(content.title).width;
  let content_list = content.content.split("进度")
  // const contentWidth = context.measureText(content.content).width;
  const contentWidth = context.measureText(content_list[0]).width;
  const width = Math.max(titleWidth, contentWidth) + 20;
  const titleHeight = 50;
  const contentHeight = 50;
  const triangleLen = titleHeight * 0.6;

  context.beginPath();
  context.moveTo(pos.x + triangleLen, pos.y);
  context.lineTo(pos.x + width, pos.y);
  context.lineTo(pos.x + width, pos.y + titleHeight);
  context.lineTo(pos.x, pos.y + titleHeight);
  context.lineTo(pos.x, pos.y + triangleLen);
  context.lineTo(pos.x + triangleLen, pos.y);
  context.fillStyle = getFillColor(content.status);
  context.fill();
  context.stroke();

  context.beginPath();
  context.fillStyle = "#FFFAFA";
  context.fillRect(pos.x, pos.y + titleHeight, width, contentHeight);
  context.strokeRect(pos.x, pos.y + titleHeight, width, contentHeight);

  context.fillStyle = "#000000";
  context.fillText(
    content.title,
    pos.x + width / 2,
    pos.y + titleHeight * 0.6,
    width
  );
  // context.fillText(
  //   content.content,
  //   pos.x + width / 2,
  //   pos.y + titleHeight + contentHeight / 2,
  //   width
  // );
  context.fillText(
    content_list[0],
    pos.x + width / 2,
    pos.y + titleHeight + contentHeight / 2,
    width
  );
  context.fillText(
    "进度" + content_list[1],
    pos.x + width / 2,
    pos.y + titleHeight + contentHeight / 2 + 20,
    width
  );

  return {
    id: content.id,
    content: content,
    rect: {
      x: pos.x,
      y: pos.y,
      width: width,
      height: titleHeight + contentHeight
    },
    topArrowDot: { x: pos.x + width / 2, y: pos.y },
    bottomArrowDot: {
      x: pos.x + width / 2,
      y: pos.y + titleHeight + contentHeight
    }
  };
};
// 箭头 图案
export function drawArrow(
  ctx:any,
  fromX:number,
  fromY:number,
  toX:number,
  toY:number,
  theta?:number,
  headlen?:number,
  width?:number,
  color?:string
) {
  theta = theta || 20;
  headlen = headlen || 15;
  width = width || 2;
  color = color || "#000";

  theta = theta || 20;
  headlen = headlen || 15;
  width = width || 2;
  color = color || "#000";

  // 计算各角度和对应的P2,P3坐标
  var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
    angle1 = ((angle + theta) * Math.PI) / 180,
    angle2 = ((angle - theta) * Math.PI) / 180,
    topX = headlen * Math.cos(angle1),
    topY = headlen * Math.sin(angle1),
    botX = headlen * Math.cos(angle2),
    botY = headlen * Math.sin(angle2);

  ctx.save();
  ctx.beginPath();

  var arrowX = fromX - topX,
    arrowY = fromY - topY;

  ctx.moveTo(arrowX, arrowY);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  arrowX = toX + topX;
  arrowY = toY + topY;
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(toX, toY);
  arrowX = toX + botX;
  arrowY = toY + botY;
  ctx.lineTo(arrowX, arrowY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
};

//绘制图案，返回值为：
// returnValue = {
//  rect:{x,y,width,height},//点击响应矩形区域
//  topArrowDot:{x,y},//顶部箭头连线点
//  bottomArrowDot:{x,y}//底部箭头连线点
// }
export function renderShape(context: CanvasRenderingContext2D, pos:{x:number,y:number}, content:contentType) {
  context.lineWidth = 2;
  context.strokeStyle = "#000000";

  switch (content.type) {
    case "before": {
      return drawBefore(context, pos, content);
    }
    case "sync": {
      return drawSync(context, pos, content);
    }
    case "proc": {
      return drawProc(context, pos, content);
    }
    default:
        return {} as drawType;
  }
};
