from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .utils import my_jwt_response_handler


# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         # The default result (access/refresh tokens)
#         print(type(self))
#         print(attrs)
#         data = super(TokenObtainPairSerializer, self).validate(attrs)
#         print("\n\n\n\n")
#         print(data)
#         # Custom data you want to include
#         data.update({'user': self.username})
#         # and everything else you want to send in the response
#         return data

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        model = User
        
        token = super().get_token(user)
        # print("\n\n\n\n")
        # print(token)
        # token = my_jwt_response_handler(token, user)
        
        return token

