package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.*;
import com.myteamfinder.api.repositories.PostRepository;
import com.myteamfinder.api.repositories.TeamRepository;
import com.myteamfinder.api.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Math.abs;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeamRepository teamRepository;
    private final PostRepository postRepository;

    public UserServiceImpl(UserRepository userRepository, TeamRepository teamRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.teamRepository = teamRepository;
        this.postRepository = postRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity<User> getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        return ResponseEntity.ok(user);
    }

    @Override
    public User createNewUser(User user) {
        System.out.println(user.getPassword());
        if (user.getPassword() != null) {
            String encodedPassword = this.passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
        }

        return userRepository.save(user);
    }

    @Override
    public ResponseEntity<User> updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));

        user.setDisplayName(userDetails.getDisplayName());
        user.setCountry(userDetails.getCountry());
        user.setLolUser(userDetails.getLolUser());
        if (user.getLolUser() != null) {
            user.getLolUser().setRankLevel(user.getLolUser().rankLevelTranslator());
        }
        user.setDotaUser(userDetails.getDotaUser());
        user.setTeamOwned(userDetails.getTeamOwned());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public User findByGoogleId(String googleId) {
        return userRepository.findByGoogleId(googleId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with google id: " + googleId));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Override
    public Boolean comparePasswords(Long id, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        return this.passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public User changePassword(Long id, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        String encodedPassword = this.passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        this.userRepository.save(user);
        return user;
    }

    @Override
    public Map<String, List<Team>> getRecommendation(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        List<Team> teams = teamRepository.findAll();

        ArrayList<Team> lolTeams = new ArrayList<Team>();
        ArrayList<Team> dotaTeams = new ArrayList<Team>();

        TreeMap<Double, Team> lolMap = new TreeMap<Double, Team>(Collections.reverseOrder());
        TreeMap<Double, Team> dotaMap = new TreeMap<Double, Team>(Collections.reverseOrder());

        Map<String, List<Team>> response = new HashMap<>();

        for (Team team : teams) {

            Double lolHeuristicValue = 0.0;
            Double lolRankDiff = 0.0;
            Double lolPositions = 0.0;

            Double dotaHeuristicValue = 0.0;
            Double dotaRankDiff = 0.0;
            Double dotaPositions = 0.0;

            if (user.getLolUser() != null) {
                LolUser lolUSer = user.getLolUser();
                if (lolUSer.getTeam() == null) {

                    if (lolUSer.getRankLevel() != null && team.getAvgLolRank() != null) {
                        lolRankDiff = abs(lolUSer.getRankLevel() - lolRankTranslate(team.getAvgLolRank()));
                    }

                    List<Post> teamPosts = postRepository.findAllByUser(team.getOwner());

                    if(!teamPosts.isEmpty()) {

                        teamPosts.sort(Comparator.comparing(Post::getTimestamp).reversed());
                        Post post = teamPosts.get(0);

                        if (post != null) {
                            if (post.getLolFilters() != null) {
                                if (post.getLolFilters().getTop() != null) {
                                    if (post.getLolFilters().getTop()) {
                                        if (lolUSer.getTop() != null) {
                                            if (lolUSer.getTop()) lolPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getLolFilters().getJungle() != null) {
                                    if (post.getLolFilters().getJungle()) {
                                        if (lolUSer.getJungle() != null) {
                                            if (lolUSer.getJungle()) lolPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getLolFilters().getMid() != null) {
                                    if (post.getLolFilters().getMid()) {
                                        if (lolUSer.getMid() != null) {
                                            if (lolUSer.getMid()) lolPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getLolFilters().getBottom() != null) {
                                    if (post.getLolFilters().getBottom()) {
                                        if (lolUSer.getBottom() != null) {
                                            if (lolUSer.getBottom()) lolPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getLolFilters().getSupport() != null) {
                                    if (post.getLolFilters().getSupport()) {
                                        if (lolUSer.getSupport() != null) {
                                            if (lolUSer.getSupport()) lolPositions += 1.0;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (team.getLolRegion() != null) {
                        if (team.getLolRegion().equals(lolUSer.getLolRegion())) {
                            lolHeuristicValue += 100.0;
                        }
                    }

                    if (lolRankDiff <= 1) {
                        lolHeuristicValue -= lolRankDiff * 5;
                    } else {
                        lolHeuristicValue -= lolRankDiff * 10;
                    }

                    if (lolPositions <= 1) {
                        lolHeuristicValue += lolPositions * 10;
                    } else if (lolPositions == 2) {
                        lolHeuristicValue += 17.5;
                    } else if (lolPositions == 3) {
                        lolHeuristicValue += 22.5;
                    } else {
                        lolHeuristicValue += 25.0;
                    }

                    lolMap.put(lolHeuristicValue, team);
                }
            }

            if (user.getDotaUser() != null) {
                DotaUser dotaUSer = user.getDotaUser();
                if (dotaUSer.getTeam() == null) {

                    if (dotaUSer.getSoloMmr() != null && team.getAvgDotaMmr() != null) {
                        dotaRankDiff = Double.valueOf(abs(dotaUSer.getSoloMmr() - team.getAvgDotaMmr()));
                    }

                    List<Post> teamPosts = postRepository.findAllByUser(team.getOwner());

                    if(!teamPosts.isEmpty()) {

                        teamPosts.sort(Comparator.comparing(Post::getTimestamp).reversed());
                        Post post = teamPosts.get(0);

                        if (post != null) {
                            if (post.getDotaFilters() != null) {
                                if (post.getDotaFilters().getCarry() != null) {
                                    if (post.getDotaFilters().getCarry()) {
                                        if (dotaUSer.getCarry() != null) {
                                            if (dotaUSer.getCarry()) dotaPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getDotaFilters().getMid2() != null) {
                                    if (post.getDotaFilters().getMid2()) {
                                        if (dotaUSer.getMid2() != null) {
                                            if (dotaUSer.getMid2()) dotaPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getDotaFilters().getOfflane() != null) {
                                    if (post.getDotaFilters().getOfflane()) {
                                        if (dotaUSer.getOfflane() != null) {
                                            if (dotaUSer.getOfflane()) dotaPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getDotaFilters().getFarmSupport() != null) {
                                    if (post.getDotaFilters().getFarmSupport()) {
                                        if (dotaUSer.getFarmSupport() != null) {
                                            if (dotaUSer.getFarmSupport()) dotaPositions += 1.0;
                                        }
                                    }
                                }
                                if (post.getDotaFilters().getHardSupport() != null) {
                                    if (post.getDotaFilters().getHardSupport()) {
                                        if (dotaUSer.getHardSupport() != null) {
                                            if (dotaUSer.getHardSupport()) dotaPositions += 1.0;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (dotaRankDiff <= 1) {
                        dotaHeuristicValue -= dotaRankDiff * 5;
                    } else {
                        dotaHeuristicValue -= dotaRankDiff * 10;
                    }

                    if (dotaPositions <= 1) {
                        dotaHeuristicValue += dotaPositions * 10;
                    } else if (dotaPositions == 2) {
                        dotaHeuristicValue += 17.5;
                    } else if (dotaPositions == 3) {
                        dotaHeuristicValue += 22.5;
                    } else {
                        dotaHeuristicValue += 25.0;
                    }

                    dotaMap.put(dotaHeuristicValue, team);
                }
            }
        }

        int c = 1;

        Set<Map.Entry<Double, Team>> lolEntries = lolMap.entrySet();
        Set<Map.Entry<Double, Team>> dotaEntries = dotaMap.entrySet();

        for (Map.Entry<Double, Team> entry : lolEntries) {
            lolTeams.add(entry.getValue());
            c++;
            if (c > 2) {
                break;
            }
        }

        c = 1;

        for (Map.Entry<Double, Team> entry : dotaEntries) {
            dotaTeams.add(entry.getValue());
            c++;
            if (c > 2) {
                break;
            }
        }

        response.put("LoL", lolTeams);
        response.put("Dota2", dotaTeams);
        return response;
    }

    private Double lolRankTranslate(String rank) {
        switch(rank) {
            case "IRON_IV":
                return 1.0;
            case "IRON_III":
                return 2.0;
            case "IRON_II":
                return 3.0;
            case "IRON_I":
                return 4.0;
            case "BRONZE_IV":
                return 5.0;
            case "BRONZE_III":
                return 6.0;
            case "BRONZE_II":
                return 7.0;
            case "BRONZE_I":
                return 8.0;
            case "SILVER_IV":
                return 9.0;
            case "SILVER_III":
                return 10.0;
            case "SILVER_II":
                return 11.0;
            case "SILVER_I":
                return 12.0;
            case "GOLD_IV":
                return 13.0;
            case "GOLD_III":
                return 14.0;
            case "GOLD_II":
                return 15.0;
            case "GOLD_I":
                return 16.0;
            case "PLATINUM_IV":
                return 17.0;
            case "PLATINUM_III":
                return 18.0;
            case "PLATINUM_II":
                return 19.0;
            case "PLATINUM_I":
                return 20.0;
            case "DIAMOND_IV":
                return 21.0;
            case "DIAMOND_III":
                return 22.0;
            case "DIAMOND_II":
                return 23.0;
            case "DIAMOND_I":
                return 24.0;
            case "MASTER":
                return 25.0;
            case "GRANDMASTER":
                return 26.0;
            case "CHALLENGER":
                return 27.0;
            default:
                return 0.0;
        }
    }
}
