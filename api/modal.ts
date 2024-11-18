export const MODALS = {
  'comments': `query {
    comments(pagination: {start: 0, limit: 25}){
      data{
        id
        attributes{
          comment
          resourceId
          type
          publishedAt
          author{
            data{
              id
              attributes{
                username
                isAvailable
                firstName
                lastName
                createdAt
                photo{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,

  'me': `query{
    me{
      email,
      username,
      confirmed,
      gender,
    }
  }`,

  'notificationTokens': `query{
  notificationTokens(sort: "publishedAt:desc", pagination: {start: 0, limit: 25}){
    data{
      id,
      attributes{
        tokenID
      }
    }
  }
  }`,

  'techTips': `query{
    techTips(sort: "publishedAt:desc", pagination: {start: 0, limit: 25}){
      data{
        id
        attributes{
          title
          details
          source_url
          authors
          tags
          source_url_text
        }
      }
    }
  }`,

  'opportunities': `query {
    opportunities(sort: "publishedAt:desc", pagination: {start: 0, limit: 25}){
      data{
        id,
        attributes{
          Title,
          Category,
          Role,
          URL,
          Expires,
          Location,
          publishedAt,
          compensation, 
          Company,
          Description,
          company_logo{
            data{
              id,
              attributes{
                url
              }
            }
          },
          cover_image{
            data{
              id,
              attributes{
                url
              }
            }
          },
        }
      }
    }
  }`,

  'sentNotifications': `query{
    sentNotifications(pagination: {start: 0, limit: 25}){

    }
  }`,
  'communityMembers':`query{
  communityMembers{
    data{
      id,
      attributes{
        email,
        country,
        phoneNumber,
        isWhatsAppPhone,
        primaryRole
      }
    }
  }
  }`,
  'products':`query{
  products{
    data{
      id
      attributes{
        name
        tagline
        description
        createdAt
        status
        totalViews
        media{
          data{
            id
            attributes{
              url
            }
          }
        }
        tutorial{
          data{
            id
          }
        }
        uploadedBy{
          data{
            id
            attributes{
              firstName
              lastName
              primaryDomain
            }
          }
        }
        url
        meta
      }
    }
  }
  }`,
'posts': `query {
  posts {
    data {
      id
      attributes {
        author{
         data{
          attributes{
            firstName
            lastName
            email
            photo{
              data {
                id
                attributes {
                  url
                }
          }
            }
          }
         }
        }
        content
        createdAt
        updatedAt
        topics {
          data {
            id
            attributes {
              name
              slug
              description
              usageCount
              isTrending
            }
          }
        }
        type
        views
        poll {
          data {
            id
            attributes {
              # options 
              endDate
              isMultipleChoice
              status
            }
          }
        }
        media {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`
}