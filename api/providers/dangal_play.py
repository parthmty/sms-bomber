import httpx


class p_dangal_play:
    """
    Source: https://www.dangalplay.com/
    """

    def __init__(self):
        self.name = "dangal_play"
        self.url = "https://www.dangalplay.com/"

    def send(self, phone: str):
        req_url = "https://ottapi.dangalplay.com/users/send_otp?auth_token=jqeGWxRKK7FK5zEk3xCM"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.dangalplay.com/",
            "Origin": "https://www.dangalplay.com",
        }
        body = {"email_id": "91" + phone, "region": "IN", "type": "msisdn"}

        try:
            r = httpx.post(req_url, headers=headers, json=body, timeout=30.0)
            if r.status_code == 200:
                return 1
            else:
                return 0
        except:
            return -1
