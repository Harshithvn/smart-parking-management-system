package com.smartparking.backend.service;

import com.smartparking.backend.dto.JwtResponse;
import com.smartparking.backend.dto.LoginRequest;
import com.smartparking.backend.dto.RegisterRequest;
import com.smartparking.backend.model.Role;
import com.smartparking.backend.model.User;
import com.smartparking.backend.repository.UserRepository;
import com.smartparking.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public JwtResponse register(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(Role.USER);

        userService.register(user);

        String token = jwtService.generateToken(user.getEmail());

        return new JwtResponse(
                token,
                "Bearer",
                user.getEmail(),
                user.getRole().name()
        );
    }

    public JwtResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());

        return new JwtResponse(
                token,
                "Bearer",
                user.getEmail(),
                user.getRole().name()
        );
    }
}