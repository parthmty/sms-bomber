import httpx


class p_alt_balaji:
    """
    Source: https://altt.co.in/
    """

    def __init__(self):
        self.name = "alt_balaji"
        self.url = "https://altt.co.in/"

    def send(self, phone: str):
        req_url = "https://api.altt.studio/automatorapi/v10/user/login/phone/device/web"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://altt.co.in/",
            "Origin": "https://altt.co.in",
        }

        body = {
            "phone": phone,
            "type": "phone",
            "dd": '{"make_model":"Firefox","os":"Linux","screen_resolution":"700*900","push_device_token":"others","device_type":"web","platform":"desktop","device_unique_id":"701mf4d258167baea515e6ae0e784274","onesignal_device_id":"fs90045jfddf"}',
        }

        try:
            r = httpx.post(req_url, headers=headers, data=body, timeout=30.0)
            if r.status_code == 200 and r.json()["code"] == 1:
                return 1
            else:
                return 0
        except:
            return -1
