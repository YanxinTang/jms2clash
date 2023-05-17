import { BadRequestException } from "./error";

/**
 * 从 JMS 返回的名称中提取标识
 * @param jmsName
 * @returns
 */
export function getName(jmsName: string) {
  const matched = /^JMS.*@(.+?)\..*$/.exec(jmsName);
  if (matched && matched[1]) {
    return matched[1];
  }
  return jmsName;
}

/**
 * 获取服务器 ID
 * @param sever 服务器名称
 * @return
 */
export function getServerID(sever: string) {
  return sever.split(".")[0];
}


/**
 * 分割 jms 订阅文件
 * @param str 
 * @returns 
 */
export function splitJmsSubscriptionFile(str: string): string[] {
  try {
    const raw = atob(str);
    const subscriptions = raw.split("\n");
    return subscriptions;
  } catch {
    throw new BadRequestException('failed to split jms subscription file')
  }

}

export async function downloadJmsSubscriptionFile(search: string) {
  const url = `https://jmssub.net/members/getsub.php${search}`;
  const response = await fetch(url)
  return response.text()
}